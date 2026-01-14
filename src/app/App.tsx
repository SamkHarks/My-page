import { Main } from "src/app/components/main/Main";
import { Modal } from "src/common/components/modal/Modal";
import { Notifications } from "src/common/components/notifications/Notifications";
import { useBackendWakeup } from "src/app/hooks/useBackendWakeup";


const App = (): React.JSX.Element => {
  useBackendWakeup();
  return (
  <>
    <Main />
    <Modal />
    <Notifications />
  </>
)};

export default App;