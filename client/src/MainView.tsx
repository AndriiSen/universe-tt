import { Center, Flex, Text } from "@chakra-ui/layout";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingView } from "./components/LoadingView";
import { PlayerDetailsModal } from "./components/PlayerDetailsModal";
import { PlayersList } from "./components/PlayersList";
import { Context } from "./context/context";
import { setupEventSource } from "./eventSource/eventSource";
import { useMediaQuery } from '@chakra-ui/react'
import { IPlayer } from "./constants";
import { sortByScore } from "./helpers/sort";







export const MainView = () => {
  const [players, setPlayers] = useState<IPlayer[] | []>([]);
  const [isAscendingOrder, setisAscendingOrder] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | {}>({})
  const [isMobileView] = useMediaQuery('(max-width: 1040px)')


  const toggleSortOrder = () => {
    sessionStorage.setItem('isAscendingOrder', JSON.stringify(!isAscendingOrder))
    setisAscendingOrder(!isAscendingOrder)
  }


  const handleNewPlayer = useCallback((newPlayer: IPlayer) => {
    setPlayers((prev: IPlayer[]) => {
      return [...prev, newPlayer]
    })
  }, [])


  useEffect(() => {
    const sse = setupEventSource(handleNewPlayer)
    return () => {
      sse.close()
    }
  }, [handleNewPlayer])

  useEffect(() => {
    const storedPlayers = sessionStorage.getItem('players')
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers))
    }
  }, [])
  useEffect(() => {
    const storedOrder = sessionStorage.getItem('isAscendingOrder')
    console.log(storedOrder)
    if (storedOrder !== null) {
      setisAscendingOrder(JSON.parse(storedOrder))
    }
  }, [])


  useEffect(() => {
    if (players.length) {
      sessionStorage.setItem('players', JSON.stringify(players))
    }
  }, [players])


  return (
    <>
      <Context.Provider value={{ players, selectedPlayer, setSelectedPlayer, toggleSortOrder }}>
        <Flex width={isMobileView ? "100%" : "1040px"} flexDirection="column" margin="auto" pl={isMobileView ? "15px" : "0"} pr={isMobileView ? "15px" : "0"} >
          <Text fontWeight="200px" fontSize="52px" mt="60px" mb="45px">Score board</Text>
          <Center className="App" bg="#FFFFFF" rounded="16px" width="100%">
            {players.length ? <PlayersList players={sortByScore(isAscendingOrder, players)} isAscendingOrder={isAscendingOrder} /> : <LoadingView />}
          </Center>
          <Routes>
            <Route path="player/:id" element={<PlayerDetailsModal />} />
          </Routes>
        </Flex>

      </Context.Provider>
    </>

  );
}


