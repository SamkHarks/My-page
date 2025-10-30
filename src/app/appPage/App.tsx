import { AppLoader } from "src/app/appPage/AppLoader";
import { Modal } from "src/components/modal/Modal";
import { Notifications } from "src/components/notifications/Notifications";


const App = (): React.JSX.Element => (
  <>
    <AppLoader />
    <Modal />
    <Notifications />
  </>
);

export default App;