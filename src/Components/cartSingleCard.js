import { Box, Button, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { removeProductFromCart, updateProductInCart } from "../Redux/cart/actions";

export default function CartSingleCard({ title, price, images, color, quantity, category, _id }) {
    let dispach = useDispatch()
    return (
        <Box w="400px" >
            <Text>{title}</Text>
            <Flex gap="2">
                <Box>

                    <Image h="370px" src={images[1]} />
                </Box>
                <Flex height="370px" direction={"column"} justifyContent="space-between">
                    <VStack alignItems={"flex-start"} >
                        <Text>{category}</Text>
                        <Text>{color}</Text>
                        <Text>size</Text>
                        <Flex>
                            <Button bgColor={"transparent"} onClick={() => dispach(updateProductInCart(_id, Number(quantity - 1))) }>-</Button>
                            <Button bgColor={"transparent"}>{quantity}</Button>
                            <Button bgColor={"transparent"} onClick={() => dispach(updateProductInCart(_id, Number(quantity + 1))) }>+</Button>
                        </Flex>
                    </VStack>
                    <HStack>
                        <Text>₹ {price}</Text>
                    </HStack>
                    <VStack alignItems={"flex-start"}>
                        <Text>SAVE FOR LATER</Text>
                        <Text cursor='pointer' onClick={() => dispach(removeProductFromCart(_id))}>REMOVE</Text>
                    </VStack>
                </Flex>
            </Flex>
        </Box>
    )
}