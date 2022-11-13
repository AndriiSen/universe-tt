import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Avatar,
    Text,
    Button,
    useMediaQuery,
    Box
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Context } from '../context/context'

export const PlayerDetailsModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { selectedPlayer, setSelectedPlayer } = useContext(Context)
    const navigate = useNavigate()
    const onClose = useCallback(() => {
        setSelectedPlayer({})
        setIsOpen(false)
        navigate('/')
    }, [navigate, setSelectedPlayer])
    const [isMobileView] = useMediaQuery('(max-width: 1040px)')

    useEffect(() => {
        if (!selectedPlayer.name) {
            console.log("triggered close")
            onClose()
        }
        setIsOpen(true)
    }, [onClose, selectedPlayer.name])

    return (
        <Box pos="absolute" top="0" left="0">
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent
                    minWidth={isMobileView ? "0" : "540px"}
                    className="testeeee"
                    rounded="16px"
                    minHeight="700px"
                    justifyContent="center"
                    alignItems="center"
                    pt="30px"
                    ml={isMobileView ? "15px" : "0"}
                    mr={isMobileView ? "15px" : "0"}
                >
                    <Avatar src={selectedPlayer.avatar} height="200px" width="200px" />
                    <ModalBody>
                        <Text
                            textAlign="center"
                            mt="25px"
                            fontSize="53px"
                            fontWeight="700px"
                        >
                            {selectedPlayer.name}
                        </Text>
                        <Text textAlign="center" fontSize="24px" fontWeight="700px">{selectedPlayer.score}</Text>
                        <Text
                            fontSize="16px"
                            fontWeight="500px"
                            color="#808080"
                            ml="6px"
                            mr="6px"
                        >
                            {selectedPlayer.bio}
                        </Text>
                    </ModalBody>
                    <ModalFooter width="100%">
                        <Button variant="ghost"

                            ml="6px"
                            mr="6px"
                            onClick={onClose}
                            width="100%"
                            backgroundColor="#FFFFFF"
                            color="#000000"
                            border="1px"
                            borderColor="D4D4D4"
                            _hover={{ backgroundColor: "#FAF0E2", color: "#DD9F42" }}
                        >
                            <CloseIcon h="10px" w="10px" mr="10px" />
                            <Text fontSize="16px" fontWeight="500">Close</Text>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>)
}