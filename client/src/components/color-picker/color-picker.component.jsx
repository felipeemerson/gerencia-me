import React, { useState } from 'react';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    SimpleGrid,
    Button,
    useBoolean
} from '@chakra-ui/react';

/*
    Component based on https://github.com/Buupu/chakra-color-picker
*/
const ColorPicker = ({ onChange, color }) => {
    const [isOpen, setIsOpen] = useBoolean();

    const colors = [
        "gray.400",
        "red.400",
        "gray.600",
        "green.400",
        "blue.400",
        "blue.700",
        "yellow.400",
        "orange.400",
        "purple.400",
        "pink.100"
      ];

    return (
        <>
            <Popover isOpen={isOpen} onClose={setIsOpen.toggle} variant="picker">
                <PopoverTrigger>
                    <Button
                        aria-label={color}
                        bg={color}
                        _hover={{ bg: color, transform: "scale(1.05)" }}
                        _active={{ bg: color }}
                        height="22px"
                        width="20%"
                        padding={0}
                        minWidth="unset"
                        borderRadius={3}
                        onClick={setIsOpen.toggle}
                    />
                </PopoverTrigger>
                <PopoverContent w="auto" boxShadow="md">
                    <PopoverArrow />
                    <SimpleGrid columns={5} p={1} spacing={1}>
                    {colors.map((_color, index) => (
                        <Button
                            key={`color-picker-${color}-${index}`}
                            h="40px"
                            w="40px"
                            p={0}
                            minW="40px"
                            bg={_color}
                            _hover={{ bg: _color, transform: "scale(1.05)" }}
                            _active={{ bg: _color }}
                            onClick={() => {
                                setIsOpen.toggle();
                                onChange(_color);
                            }}
                        />
                    ))}
                    </SimpleGrid>
                </PopoverContent>
            </Popover>
        </>
    );
}

export default ColorPicker;