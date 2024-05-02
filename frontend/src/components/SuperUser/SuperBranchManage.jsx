import { useState } from "react";
import OpenNewBranchSuper from "./OpenNewBranchSuper";
import CheckAllBranchSuper from "./CheckAllBranchSuper";
import { useAuth } from "../../contexts/AuthContext";
function SuperBranchManage() {
  //usestate
  const [openNewBranch, setOpenNewBranch] = useState(false);
  const [checkAllBranches, setALlCheckBranches] = useState(false);
  //context
  const { token } = useAuth();
  const headers = { Authorization: token };
  const handleNewBranch = () => {
    // setOpenNewBranch(true);
    setOpenNewBranch((prev) => !prev);
    setALlCheckBranches(false);
  };
  const handleclose = () => {
    setOpenNewBranch(false);
  };

  const handleAllBranches = () => {
    setALlCheckBranches((prev) => !prev);
    setOpenNewBranch(false);
  };

  return (
    <div>
      <div className="superbuttongroup">
        <button onClick={handleNewBranch}>Create New branch</button>
        <button onClick={handleAllBranches}>Check All branch</button>
      </div>
      {openNewBranch && (
        <OpenNewBranchSuper handleclose={handleclose} headers={headers} />
      )}
      {checkAllBranches && <CheckAllBranchSuper headers={headers} />}
    </div>
  );
}

export default SuperBranchManage;
