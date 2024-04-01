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
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

const Schedule = () => {
  const dataManager = new DataManager({
    url: "",
    crudUrl: "",
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  type RoomData = {
    RoomText: string;
    Id: number;
    RoomColor: string;
  };

  const roomData: RoomData[] = [
    { RoomText: "Room 1", Id: 1, RoomColor: "#ffaa00" },
    { RoomText: "Room 2", Id: 2, RoomColor: "#f8a398" },
    { RoomText: "Room 3", Id: 3, RoomColor: "#7499e1" },
  ];

  type RoomFields = {
    text: string;
    value: string;
  };

  const roomFields: RoomFields = { text: "RoomText", value: "Id" };

  const fieldsData = {
    id: "bookingId",
    subject: {
      name: "Subject",
      title: "Who is booking",
      default: "",
    },
    description: {
      title: "Description (optional)",
    },
    roomData: {
      title: "Room",
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

  const meetingRoomTemplate = (props: { RoomId?: number }) => {
    return props !== undefined ? (
      <form className='custom-editor-window flex flex-col gap-y-8'>
        <div className='flex-row w-full'>
          <label className='e-textlabel'>Who is booking?</label>
          <input
            type='text'
            id='Booking'
            className='e-field e-input'
            name='Subject'
          />
        </div>
        <div className='flex-row w-full'>
          <DropDownListComponent
            placeholder='Choose meeting Room'
            className='e-field'
            data-name='RoomId'
            dataSource={roomData}
            fields={roomFields}
            value={props.RoomId}
          ></DropDownListComponent>
        </div>
        <div className='flex gap-x-12 w-full'>
          <div className='startTime'>
            <label className='e-textlabel'>Start</label>
            <DateTimePickerComponent
              format='dd/MM/yy hh:mm a'
              id='StartTime'
              data-name='StartTime'
              value={
                new Date((props as any).startTime || (props as any).StartTime)
              }
              className='e-field'
            ></DateTimePickerComponent>
          </div>

          <div className='endTime'>
            <label className='e-textlabel'>End</label>
            <DateTimePickerComponent
              format='dd/MM/yy hh:mm a'
              id='EndTime'
              data-name='EndTime'
              value={new Date((props as any).endTime || (props as any).EndTime)}
              className='e-field'
            ></DateTimePickerComponent>
          </div>
        </div>
        <div className='flex-row w-full'>
          <label className='e-textlabel'>Description optional (optional)</label>
          <textarea
            id='description'
            className='e-field e-input'
            name='Description'
          />
        </div>
      </form>
    ) : (
      <div></div>
    );
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
        firstDayOfWeek={1}
        editorTemplate={meetingRoomTemplate}
        showQuickInfo={false}
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
