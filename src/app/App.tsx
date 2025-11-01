import { Main } from "src/app/components/main/Main";
import { Modal } from "src/common/components/modal/Modal";
import { Notifications } from "src/common/components/notifications/Notifications";


const App = (): React.JSX.Element => (
  <>
    <Main />
    <Modal />
    <Notifications />
  </>
);

export default App;