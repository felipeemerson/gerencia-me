import React from 'react';
import { Link as NavLink } from 'react-router-dom';

import { Heading, Box, HStack, Button, Flex, Spacer, StackDivider, Link } from '@chakra-ui/react';

const Header = () => {

    return (
        <div>
            <Flex p='1em' verticalAlign='center'>
                <Box p='0.5em'>
                    <Heading as='h1' size='xl' color='blue.600'>Gerencia-Me</Heading>
                </Box>

                <HStack divider={<StackDivider borderColor='blue.200' />} mx='4em' spacing='5' p='1em'>
                    <Link as={NavLink} color='blue.600' to='/types'>Tipos</Link>
                    <Link as={NavLink} color='blue.600' to='/'>Tarefas</Link>
                </HStack>

                <Spacer />

                <Button colorScheme='blue' variant='outline'>Sair</Button>
            </Flex>

        </div>
    );
}

export default Header;