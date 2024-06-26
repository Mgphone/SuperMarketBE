import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import UserResetPassword from "../UserAuthenticationFront/UserResetPassword";
import axiosWithHeader from "../../utils/axiosWithHeader";
function BranchManagerUser() {
  const [userData, setUserData] = useState();
  const [branchData, setBranchData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetValue, setResetValue] = useState("");
  const { token, decodedToken } = useAuth();
  const axiosInstance = axiosWithHeader(token);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const [users, branches] = await Promise.all([
        axiosInstance("/username/findalluser"),
        axiosInstance("/branches/getallbranch"),
      ]);
      if (!users.data && !branches.data) {
        throw new Error("Failed to fetch data");
      }

      const usersJson = await users.data;
      const branchJson = await branches.data;
      setUserData(usersJson);
      setBranchData(branchJson);
      setIsLoading(false);
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateNewUser = () => {
    navigate("/register");
  };
  const findBranchName = (branchArray, branchId) => {
    const foundBranch = branchArray.find((branch) => branch._id === branchId);
    return foundBranch ? foundBranch.branch_name : branchId;
  };
  const handleEdit = (value) => {
    setIsResetPassword(true);
    setResetValue(value);
  };
  const handleDelete = async (value) => {
    const confirmDelete = window.confirm("Are you ready to delete?");
    if (confirmDelete) {
      try {
        const response = await axiosInstance.delete(`/users/delete/${value}`);
        if (response.status < 200 || response.status >= 300) {
          throw new Error("Failed to delete user");
        }
        const deleteJson = await response.data;
        deleteJson;
        toast(deleteJson.message);
      } catch (error) {
        setIsError(error.message);
        setIsLoading(false);
      }
      setIsLoading(true);
      fetchData();
    } else {
      toast("Delete Cancel");
    }
  };
  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }
  return (
    <>
      {branchData && userData && (
        <div className="superusermanage">
          <div className="superbuttongroup">
            <button onClick={handleCreateNewUser}>Create New User</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>UserName</th>
                  <th>Role</th>
                  <th>Branch</th>
                  <th>Reset Password</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.role}</td>
                    <td>
                      {item.branch
                        ? findBranchName(branchData, item.branch) ||
                          "Branch Not Found"
                        : "Area Manager"}
                    </td>
                    <td>
                      {item._id !== decodedToken.userId && (
                        <button onClick={() => handleEdit(item._id)}>
                          Reset
                        </button>
                      )}
                    </td>
                    <td>
                      {item._id !== decodedToken.userId && (
                        <button onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isResetPassword && (
            <UserResetPassword
              setIsResetPassword={setIsResetPassword}
              resetValue={resetValue}
              token={token}
            />
          )}
        </div>
      )}
    </>
  );
}

export default BranchManagerUser;
