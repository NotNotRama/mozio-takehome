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

type Country = {
  id: number;
  name: string;
  description: string;
  country: string;
  climate: string;
  currency: string;
  latitude: number;
  longitude: number;
};

const Autocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedInput = useDebounce(inputValue, 500);
  const { data, isLoading, isError, error } = useCountries(debouncedInput);
  const [current, setCurrent] = useState<Country | null>(null);

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

  const { data: nearbyCountries, isLoading: nearbyLoading } =
    useNearbyCountries(current?.latitude, current?.longitude);

  useEffect(() => {
    if (selectedItem) {
      setCurrent(selectedItem);
    }
  }, [selectedItem]);

  return (
    <Flex flexDir="column" p={10}>
      <Flex flexDir="column">
        <Box>
          <Text pb={1}>Location</Text>
          <Input
            {...getInputProps()}
            placeholder="Search for a country"
            value={inputValue}
          />
          {isError ? (
            <Text>{error.message}</Text>
          ) : (
            isOpen &&
            (isLoading ? (
              <Loading />
            ) : (
              <>
                {data && data.length > 0 && (
                  <Box
                    position="relative"
                    border="1px solid gray"
                    boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                    p={2}
                    borderRadius="md"
                  >
                    <List {...getMenuProps()}>
                      {data.map((item, index) => (
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
          <Flex flexDir="column" mt={10}>
            <Text>{current.name}</Text>
            <Text>{current.description}</Text>
            <Flex flexDir="row">
              <Box fontWeight="bold" pr={2}>
                Country:
              </Box>
              <Text>{current.country}</Text>
            </Flex>
            <Flex flexDir="row">
              <Box fontWeight="bold" pr={2}>
                Climate:
              </Box>
              <Text>{current.climate}</Text>
            </Flex>
            <Flex flexDir="row">
              <Box fontWeight="bold" pr={2}>
                Currency:
              </Box>
              <Text>{current.currency}</Text>
            </Flex>

            <Box h="4" />
            <Text>Nearby Locations</Text>
            {nearbyLoading && <Loading />}
            <Grid
              templateColumns="repeat(auto-fit, minmax(120px, 1fr))"
              gap={2}
            >
              {nearbyCountries?.map((country, index) => (
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
};

export default Autocomplete;
