import React, { useEffect, useState } from 'react';
import {
  Input,
  Box,
  List,
  ListItem,
  Text,
  Flex,
  Button,
  Grid,
} from '@chakra-ui/react';
import { useCombobox } from 'downshift';
import { useCountries } from '@/hooks/useCountries';
import { useNearbyCountries } from '@/hooks/useNearbyCountries';
import { Loading } from './Loading';
import { useDebounce } from '@uidotdev/usehooks';
import { Country } from '@/types/countriesTypes';

export default function Combobox() {
  // State and hooks for handling user input, debouncing, and fetching data
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInput = useDebounce(inputValue, 500);
  const { data, isLoading, isError, error } = useCountries(debouncedInput);
  const [current, setCurrent] = useState<Country | null>(null);

  // Combobox setup using downshift for a user-friendly search experience
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
  } = useCombobox({
    items: data ?? [],
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue as string);
    },
    itemToString(item) {
      return item ? item.name : '';
    },
  });

  // Fetch nearby countries when a destination is selected
  const { data: nearbyCountries, isLoading: nearbyLoading } =
    useNearbyCountries({
      latitude: current?.latitude,
      longitude: current?.longitude,
    });

  // Update the 'current' state when an item is selected from the combobox
  useEffect(() => {
    if (selectedItem) {
      setCurrent(selectedItem);
    }
  }, [selectedItem]);

  return (
    <Flex flexDir="column" p={10}>
      <Flex flexDir="column">
        <Box>
          <Text fontWeight="semibold" pb={1}>
            Location
          </Text>
          <Input
            {...getInputProps()}
            placeholder="Search for a country"
            value={inputValue}
            fontWeight="normal"
          />
          {isError ? (
            // Display error message when there's an error
            <Text color="red">{error.message}</Text>
          ) : (
            isOpen &&
            (isLoading ? (
              // Show loading spinner while data is being fetched
              <Loading />
            ) : (
              <>
                {data && data.length > 0 && (
                  // Render combobox menu when data is available
                  <Box
                    position="relative"
                    border="1px solid gray"
                    boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                    p={2}
                    borderRadius="md"
                  >
                    <List {...getMenuProps()}>
                      {data.map((item, index) => (
                        // Render list items based on search results
                        <ListItem
                          {...getItemProps({ item, index })}
                          key={index}
                          bg={highlightedIndex === index ? 'gray.400' : 'white'}
                        >
                          <Text
                            pl={2}
                            onClick={() => console.log('click', item.name)}
                          >
                            {item.name}
                          </Text>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </>
            ))
          )}
        </Box>
        {current && (
          // Display detailed information about the selected destination
          <Flex flexDir="column" mt={10}>
            <Text fontWeight="semibold">{current.name}</Text>
            <Text fontWeight="semibold">{current.description}</Text>
            <Flex flexDir="row">
              <Text fontWeight="bold" pr={2}>
                Country:
              </Text>
              <Text fontWeight="semibold">{current.country}</Text>
            </Flex>
            <Flex flexDir="row">
              <Text fontWeight="bold" pr={2}>
                Climate:
              </Text>
              <Text fontWeight="semibold">{current.climate}</Text>
            </Flex>
            <Flex flexDir="row">
              <Text fontWeight="bold" pr={2}>
                Currency:
              </Text>
              <Text fontWeight="semibold"> {current.currency}</Text>
            </Flex>

            <Box h="4" />
            <Text fontWeight="semibold">Nearby Locations</Text>
            {nearbyLoading && <Loading />}
            <Grid
              templateColumns="repeat(auto-fit, minmax(120px, 1fr))"
              gap={2}
            >
              {nearbyCountries?.map((country, index) => (
                // Render nearby locations as buttons
                <Button
                  key={index}
                  size="sm"
                  onClick={() => setCurrent(country)}
                  p={10}
                  whiteSpace="normal"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  colorScheme="purple"
                >
                  {country.name}
                </Button>
              ))}
            </Grid>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
