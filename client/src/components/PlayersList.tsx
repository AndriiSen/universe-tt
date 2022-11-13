import { Box, Flex, Text } from "@chakra-ui/layout"
import { PlayersListItem } from "./PlayersListItem"
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../context/context"
import { IPlayer } from "../constants"


interface IPlayersListProps {
    players: IPlayer[],
    isAscendingOrder: boolean | undefined
}

export const PlayersList = ({ players, isAscendingOrder }: IPlayersListProps) => {
    const [isTitleStuck, setIsTitleStuck] = useState<boolean>(false)
    const { toggleSortOrder } = useContext(Context)
    const prevLeader = useRef<IPlayer>(players[0])
    const listTitle = useRef<HTMLDivElement | null>(null)

    const checkTitlePosition = () => {
        if (!listTitle.current?.getBoundingClientRect().top) {
            setIsTitleStuck(true)
        } else {
            setIsTitleStuck(false)
        }
    }
    const isNewLeader = () => {
        return prevLeader.current.name !== players[0].name
    }


    useEffect(() => {
        prevLeader.current = players[0]
    })

    useEffect(() => {
        window.addEventListener('scroll', checkTitlePosition);
        return () => {
            window.removeEventListener('scroll', () => { })
        }
    }, [])


    return (
        <Box flexDirection="column" width="100%" >
            <Flex
                ref={listTitle} id="list-title"
                justifyContent="space-between" boxShadow={isTitleStuck ? 'lg' : ''}
                borderRadius={isTitleStuck ? '' : '16px 16px 0px 0px'}
                alignItems="center" pt="28px" pb="27px"
                position="sticky" top="0"
                backgroundColor="#FFFFFF"
                zIndex="900"
            >
                <Text ml="85px">Player's name</Text>
                <Flex alignItems="center" onClick={toggleSortOrder}>
                    <Box>
                        {!isAscendingOrder ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </Box>
                    <Text mr="20px">Score</Text>
                </Flex>

            </Flex>
            <Box>
                {players.map((player: IPlayer, index: number) => {
                    return < PlayersListItem player={player} key={player.name} isNewLeader={isNewLeader() && !index} />
                })}
            </Box>
        </Box >)
}

