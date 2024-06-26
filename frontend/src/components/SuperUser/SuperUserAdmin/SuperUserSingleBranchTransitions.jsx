import { useFormik } from "formik";
import SuperAdminSaleSingleBranch from "./SuperAdminSaleSingleBranch";
function SuperUserSingleBranchTransitions({
  handleSubmit,

  branchName,
  isFetchError,
  isFetchLoading,
  fetchTransitions,
  isFetchSubmit,
  setIsFetchLoading,
  setIsfetchSubmit,
}) {
  const formik = useFormik({
    initialValues: {
      date: "",
      branchId: "",
    },
    onSubmit: (values) => {
      setIsFetchLoading(true);
      setIsfetchSubmit(false);
      handleSubmit(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.date) {
        errors.date = "Date Required";
      } else if (!values.branchId) {
        errors.branchId = "Need to choose Branch";
      }
      return errors;
    },
  });
  const transitionsExist =
    fetchTransitions && Object.keys(fetchTransitions).length > 0;
  return (
    <div className="branchtransition">
      <h1>For Individual Branch How Many Day of Sales you want to see?</h1>
      <form onSubmit={formik.handleSubmit}>
        <select
          name="branchId"
          value={formik.values.branchId}
          onChange={formik.handleChange}
        >
          <option value="">Please choose the option</option>
          {branchName.map((item) => (
            <option value={item._id} key={item._id}>
              {item.branch_name}
            </option>
          ))}
        </select>
        {formik.touched.branchId && formik.errors.branchId ? (
          <div className="error">{formik.errors.branchId}</div>
        ) : null}

        <select
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
        >
          <option value="">How many days</option>
          <option value="1">Today</option>
          <option value="2">Yesterday</option>
          <option value="3">Last Three Days</option>
          <option value="7">Last Seven Days</option>
          <option value="14">Last FortNight </option>
          <option value="30">Last Month</option>
          <option value="180">Last 6 Months</option>
          <option value="360">Last Year</option>
        </select>
        {formik.touched.date && formik.errors.date ? (
          <div className="error">{formik.errors.date}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
      {isFetchError && <div className="superadminsales">{isFetchError}</div>}
      {isFetchLoading && (
        <div className="superadminsales">
          <div className="loader"></div>;
        </div>
      )}
      {isFetchSubmit ? (
        transitionsExist ? (
          <SuperAdminSaleSingleBranch
            fetchTransitions={fetchTransitions}
            value={formik.values}
          />
        ) : (
          <div className="superadminsales">
            You have no Transitions yet for{" "}
            {formik.values.date == 1 ? <> Today</> : formik.values.date} days
            Please choose difference Dates
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default SuperUserSingleBranchTransitions;
