import React,{useState} from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Link,
  Button,
} from "@nextui-org/react";
import SearchIcon from "../assets/icons/SearchIcon";
import MapIcon from "../assets/icons/MapIcon";
import LocateIcon from "../assets/icons/Locate";
import NotificationIcon from "../assets/icons/Notification";
import SettingIcon from "../assets/icons/Setting";

function Navigation({ setCity, stats}) {
  const [takeinput, setTakeInput] = useState(setCity);
  
  const handleCityChange = (e) => {
    setTakeInput(e.target.value)
  
  };
  const handleCity = () => {  
    setCity(takeinput);
  }

  return (

    <Navbar
      className="my-10 bg-gray-50 container border-2 p-5 rounded-lg"
     
    >
      <NavbarContent>
       
        <NavbarBrand>
          <p className="font-bold md:text-3xl hidden md:block text-inherit">WEATHER</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="gap-5 mx-8 hidden md:block" color="foreground" href="#">
           <div className="flex space-x-2">
           <MapIcon  /> 
          <div className="">
          {stats.location}&nbsp;<span>,</span>
            {stats.country}
          </div>
           </div>
           
            
          
          </Link>
        </NavbarItem>
      </NavbarContent>

      <Input
      
        classNames={{
          base: "max-w-full sm:max-w-[20rem] h-14",
          mainWrapper: "h-full",
          input: "text-lg",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-400/20",
        }}
        placeholder="Search Location"
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        endContent={<LocateIcon />}
        onChange={handleCityChange}
      
      />
      <NavbarContent className="md:space-x-5" justify="end">
        <NavbarItem className="w-10 md:w-auto">
          <Button onClick={handleCity} className="text-xl" color="primary" variant="bordered">
           Search
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:block">
          <NotificationIcon />
        </NavbarItem>
        <NavbarItem className="hidden lg:block">
          <SettingIcon />
        </NavbarItem>
      </NavbarContent>
      
    </Navbar>
  );
}


export default Navigation