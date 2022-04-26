import React from 'react';
import { Link as NavLink } from 'react-router-dom';
import { useQueryClient } from 'react-query'
import { useAuth } from '../../contexts/auth.context';

import { AiOutlineMenu } from 'react-icons/ai';

import {
    Box,
    HStack,
    StackDivider,
    Flex,
    Spacer,
    Heading,
    Button,
    IconButton,
    Link,
    Menu,
    MenuItem,
    MenuButton,
    MenuList,
    useMediaQuery
} from '@chakra-ui/react';

const Header = () => {
    const queryClient = useQueryClient();
    const auth = useAuth();
    const { logout } = auth;
    const [ isLargeThan1280 ] = useMediaQuery('(min-width: 1280px)');

    const handleLogout = async () => {
        logout();
        queryClient.clear();
    }

    return (
        <Flex p='1em' verticalAlign='center' bg="cyan.100" mb="20px">
            <Box p='0.5em'>
                <Heading as='h1' size='lg' color='blue.600'>Gerencia-me</Heading>
            </Box>

            {
                isLargeThan1280 ? (
                    <>
                        <HStack divider={<StackDivider borderColor='blue.200' />} mx='4em' spacing='5' p='1em'>
                            <Link as={NavLink} color='blue.600' to='/categories'>Categorias</Link>
                            <Link as={NavLink} color='blue.600' to='/'>Tarefas</Link>
                        </HStack>
                        <Spacer />
                    </>
                ) : (                  
                    <>
                        <Spacer />
                        <Box mr='5px'>
                            <Menu autoSelect={false}>
                                    <MenuButton colorScheme='blue' variant='solid' as={IconButton} icon={<AiOutlineMenu />} />
                                    <MenuList minW='20px'>
                                        <MenuItem as={NavLink} to='categories'>Categorias</MenuItem>
                                        <MenuItem as={NavLink} to='/'>Tarefas</MenuItem>
                                    </MenuList>
                            </Menu>
                        </Box>
                    </>
                )
            }

            <Button colorScheme='blue' variant='outline' onClick={handleLogout}>Sair</Button>
        </Flex>
    );
}

export default Header;