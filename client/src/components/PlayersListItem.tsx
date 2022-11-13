import { Avatar } from "@chakra-ui/avatar"
import { Flex, Text } from "@chakra-ui/layout"
import { keyframes, useMediaQuery } from "@chakra-ui/react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { IPlayer } from "../constants"
import { Context } from "../context/context"

const higlight = keyframes`
  from {background-color: #FAF0E2;}
  to {background-color: #FFFFFF;}
`
interface iPlayerListItemProps {
    player: IPlayer,
    isNewLeader: boolean
}

export const PlayersListItem = ({ player, isNewLeader }: iPlayerListItemProps) => {
    const navigate = useNavigate()
    const { setSelectedPlayer } = useContext(Context);
    const animation = isNewLeader ? `${higlight} 1s` : undefined
    const [isMobileView] = useMediaQuery('(max-width: 1040px)')

    const handleOpen = () => {
        setSelectedPlayer(player)
        navigate(`/player/${player.name.replace(' ', '')}`)
    }

    return (
        <Flex
            justifyContent="space-between"
            pt={isMobileView ? "11px" : "15px"}
            pb={isMobileView ? "11px" : "16px"}
            borderTop="1px"
            borderColor="#F5F5F5"
            pl="30px"
            pr="30px"
            onClick={handleOpen}
            animation={animation}
        >
            <Flex alignItems="center">
                <Avatar
                    src={player.avatar}
                    height={isMobileView ? "24px" : "40px"}
                    width={isMobileView ? "24px" : "40px"}
                    zIndex="0"
                />
                <Text ml="15px" fontSize="16px" fontWeight="500">{player.name}</Text>
            </Flex>

            <Text fontSize="24px" fontWeight="700">{player.score}</Text>
        </Flex>
    )
}