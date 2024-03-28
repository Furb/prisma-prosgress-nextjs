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
} from "@syncfusion/ej2-react-schedule";
import { timelineResourceData } from "../lib/datasource";

const Schedule = () => {
  const eventSettings: EventSettingsModel = {
    dataSource: timelineResourceData,
  };
  const group = { byGroupID: false, resources: ["Projects", "Categories"] };

  const projectData: Object[] = [
    { text: "PROJECT 1", id: 1, color: "#cb6bb2" },
    { text: "PROJECT 2", id: 2, color: "#56ca85" },
    { text: "PROJECT 3", id: 3, color: "#df5286" },
  ];

  return (
    <>
      <h2>Syncfusion React Schedule Component</h2>
      <ScheduleComponent
        width='100%'
        height='550px'
        currentView='Month'
        selectedDate={new Date(2018, 3, 4)}
        eventSettings={eventSettings}
        group={group}
      >
        <ViewsDirective>
          <ViewDirective option='Week' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
        <ResourcesDirective>
          <ResourceDirective
            field='ProjectId'
            title='Choose Project'
            name='Projects'
            allowMultiple={false}
            dataSource={projectData}
            textField='text'
            idField='id'
            colorField='color'
          ></ResourceDirective>
        </ResourcesDirective>
        <Inject services={[Week, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </>
  );
};

export default Schedule;
