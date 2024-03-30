"use client";
import {
  Week,
  Month,
  Agenda,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  EventSettingsModel,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
  PopupOpenEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { timelineResourceData } from "../lib/datasource";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

const Schedule = () => {
  const dataManager = new DataManager({
    url: "",
    crudUrl: "",
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  const roomData = [
    { RoomText: "Room 1", Id: 1, RoomColor: "#ffaa00" },
    { RoomText: "Room 2", Id: 2, RoomColor: "#f8a398" },
    { RoomText: "Big room", Id: 3, RoomColor: "#7499e1" },
  ];

  const fieldsData = {
    Id: "bookingId",
    Subject: {
      name: "Booking",
      title: "Who is booking",
      default: "",
    },
    description: {
      title: "Description (optional)",
    },
    roomData: {
      title: "Room",
      name: "roomId",
      dataSource: roomData,
      textField: "RoomText",
      valueField: "Id",
      colorField: "RoomColor",
    },
  };

  const eventSettings: EventSettingsModel = {
    dataSource: timelineResourceData,
    fields: fieldsData,
  };

  const onPopupOpen = (args: PopupOpenEventArgs): void => {
    if (args.type === "QuickInfo") {
      // Cancel only the quick info pop-up
      args.cancel = true;
    }
  };

  return (
    <>
      <h2>Syncfusion React Schedule Component</h2>
      <ScheduleComponent
        width='100%'
        height='550px'
        startHour='07:00'
        currentView='Week'
        timeFormat='HH:mm'
        eventSettings={eventSettings}
        popupOpen={onPopupOpen}
        selectedDate={new Date()}
      >
        <ViewsDirective>
          <ViewDirective option='Day' />
          <ViewDirective option='Week' dateFormat='dd-MMM-yyyy' />
          <ViewDirective option='Month' showWeekNumber={true} />
        </ViewsDirective>
        <ResourcesDirective>
          <ResourceDirective
            field='RoomId'
            title='Choose meeting room'
            name='Rooms'
            allowMultiple={false}
            dataSource={roomData}
            textField='RoomText'
            idField='Id'
            colorField='RoomColor'
          ></ResourceDirective>
        </ResourcesDirective>
        <Inject services={[Week, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </>
  );
};

export default Schedule;
