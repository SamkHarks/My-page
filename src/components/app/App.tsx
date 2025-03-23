import { AppLoader } from "src/components/app/AppLoader";
import { Modal } from "src/components/modal/Modal";


const App = (): React.JSX.Element => (
  <>
    <AppLoader />
    <Modal />
  </>
);

export default App;