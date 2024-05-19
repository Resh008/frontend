import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const {allEvents,isLoading} = useSelector((state)=>state.event)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents && allEvents.map((i, index) => <EventCard data={i} key={index} />)}
        </div>
      )}
    </>
  );
};

export default EventsPage;