import { AppLoader } from "src/app/appPage/AppLoader";
import { Modal } from "src/common/components/modal/Modal";
import { Notifications } from "src/common/components/notifications/Notifications";


const App = (): React.JSX.Element => (
  <>
    <AppLoader />
    <Modal />
    <Notifications />
  </>
);

export default App;