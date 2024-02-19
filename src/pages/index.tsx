/* eslint-disable @next/next/no-page-custom-font */
// pages/index.js (or Home.js)
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Badge, Text, Container, Flex, Image } from "@chakra-ui/react";

export default function Home() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelected] = useState(null); // New state for the selected bill.

  //function to grab a specific bill from the API.
  const selectBill = async (item: any) => {
    const data = await fetchData(item);
  };

  const fetchData = async (bill = { number: 0, type: "H" }) => {
    console.log(bill.number);
    if (bills.length == 0 || bill.number != 0) {
      if (bill.number) {
        const { data } = await axios.get(
          `/api/bills?number=${bill.number}&type=${bill.type}`
        );
        if (bills != data) {
          setSelected(data);
        }
        return null;
      }
      const { data } = await axios.get(`/api/bills`);
      setBills(data);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, [bills]);

  const ListItem = ({ item }: any) => {
    return (
      <Box
        w="lg" // Adjust the width as needed
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        _hover={{ bg: "#E8E8E9" }} // Apply background color on hover
        p={4}
        m={2}
        transitionDuration={"0.15s"}
        onClick={(e) => selectBill(item)}
      >
        <Container display="flex" p="0">
          <Badge fontSize="sm" colorScheme="teal" mr="2">
            Bill No. {item.number} {/* Display bill number */}
          </Badge>
          <Badge fontSize="sm" colorScheme="teal">
            {item.type} {/* Display bill type. */}
          </Badge>
        </Container>
        <Text mt={2} fontSize="sm" fontWeight="semibold">
          {item.title} {/* Display shortened title */}
        </Text>
        <Text fontSize="sm">{item.latestAction.text}</Text>{" "}
        {/* Display full title */}
      </Box>
    );
  };

  const BillDisplay = ({ bill }: { bill: any }) => {
    return (
      <Box>
        <Badge fontSize="sm" colorScheme="teal" mr="2">
          Bill No. {bill.number} {/* Display bill number */}
        </Badge>
        <Badge>Status: {bill.latestAction.text}</Badge>
        <Text fontSize="lg">{bill.title}</Text>
        <Badge>Introduced: {bill.introducedDate}</Badge>

        {bill.constitutionalAuthorityStatementText}
      </Box>
    );
  };

  return (
    <Container maxW="100%" py={2} userSelect={"none"}>
      <header
        style={{
          paddingLeft: 15,
          height: "50px", // Set a fixed height for the header
        }}
      >
        {/* Use Flex component to create a flexible layout */}
        <Flex
          as="div"
          // Set justifyContent to space-between
          justifyContent="space-between"
          // Set alignItems to center
          alignItems="center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="/icon.png"
              alt="congress_icon"
              width={"40px"}
              height={"40px"}
            />
            <Text fontFamily={"roboto"} fontSize={"20px"} marginX={2}>
              Congress.io
            </Text>
          </div>
          <nav>
            <Text as="a" href="#" mr={4}>
              Home
            </Text>
            <Text as="a" href="#about" mr={4}>
              About
            </Text>
            <Text as="a" href="#contact">
              Contact
            </Text>
          </nav>
        </Flex>
      </header>
      <main
        style={{
          display: "flex",
          // Use block for base and small screens, flex for medium and larger screens
          flexWrap: "wrap", // Allow items to wrap on smaller screens
          gap: "20px",
          fontFamily: "robotos", // Add spacing between items // Set the height of the main element to the viewport height minus the header height
          overflow: "hidden", // Prevent the page from scrolling
        }}
      >
        <div
          style={{
            paddingTop: 3,
            flex: 0.5,
            maxWidth: "500px",
            maxHeight: "85vh", // Use min-height instead of height
            overflowY: "scroll", // Enable vertical scrolling
          }}
        >
          {bills.map((item: any) => (
            <div
              key={item.number}
              style={{
                display: "flex", // Add this property to make the div a flex container
              }}
            >
              <ListItem key={item.number} item={item} />
            </div>
          ))}
        </div>
        <div
          style={{
            flex: 0.5, // Add this property to make the element a flex item
            width: "500px", // Add this property to give the element some size
          }}
        >
          {selectedBill ? BillDisplay(selectedBill) : null}
        </div>
      </main>
    </Container>
  );
}
