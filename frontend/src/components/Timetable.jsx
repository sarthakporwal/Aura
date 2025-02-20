import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
import '../App.css';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1FpQXxbf1x0ZF1MYl9bRHZPMyBoS35RckRiWXteeHZWRmFfVUVy');

function Timetable() {
    return (
        
          <div className="flex items-center justify-center min-h-screen px-4 py-10">
              <div className="w-full max-w-6xl">
                  <ScheduleComponent cssClass='custom-schedule'>
                      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                  </ScheduleComponent>
              </div>
          </div>
    );
}

export default Timetable;