import { Flex, Text } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"

export const LoadingView = () => {
    return (
        <Flex flexDirection="column" alignItems="center" mt="30px" mb="30px">
            <Text
                fontSize="24px"
                fontWeight="700"
                color="#999999"
                width="100%"
                mb="30px"
            >
                No players available
            </Text>
            <Spinner color="#DD9F42" height="30px" width="30px" />
        </Flex>)
}