import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function OpenNewBranchSuper({ handleclose, headers }) {
  const [openBranchError, setOpenBranchErrror] = useState(false);
  const headersWithContent = {
    ...headers,
    "Content-Type": "application/json",
  };

  const validationSchema = Yup.object({
    branchname: Yup.string().required("Please Fill out branchname field"),
    openingamount: Yup.string().required("Please fill out openingamount field"),
    currency: Yup.array()
      .min(1, "Please select at lease one Option of currency")
      .required("Please select at lease one Value of currency"),
  });

  const handleSubmit = async (values) => {
    const formData = {
      branchname: values.branchname,
      openingamount: values.openingamount,
      // currency: [],
    };

    try {
      const url = "/api/branches/createbranch";
      const response = await fetch(url, {
        method: "POST",
        headers: headersWithContent,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create new Branch");
      }
      const createBranchJSON = await response.json();
      // createBranchJSON;
      alert(createBranchJSON.message);
      handleclose();
    } catch (error) {
      console.error(error);
      setOpenBranchErrror(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      branchname: "",
      openingamount: "",
      currency: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div className="creatnewbranch">
      <button onClick={handleclose}>X</button>
      <h1>Create New Branch</h1>
      {openBranchError && (
        <>
          <h3 className="error">Error Happen When creating your Branch</h3>
        </>
      )}
      <form onSubmit={(e) => formik.handleSubmit(e)}>
        <label htmlFor="BranchName">
          Branch Name
          {/* <input type="text" id="branchname" name="branchname" /> */}
          <input
            type="text"
            name="branchname"
            placeholder="branchname"
            value={formik.values.branchname}
            onChange={formik.handleChange}
          />
        </label>
        {formik.touched.branchname && formik.errors.branchname && (
          <div className="errors">{formik.errors.branchname}</div>
        )}
        <label htmlFor="OpeningAmount">
          Opening Amount
          {/* <input type="number" id="OpeningAmount" name="openingamount" /> */}
          <input
            type="number"
            name="openingamount"
            placeholder="opening amount"
            value={formik.values.openingamount}
            onChange={formik.handleChange}
          />
        </label>
        {formik.touched.openingamount && formik.errors.openingamount && (
          <div className="errors">{formik.errors.openingamount}</div>
        )}
        <fieldset>
          <legend>Select Currencies:</legend>

          <input
            type="checkbox"
            id="USD"
            name="currency"
            value="USD"
            checked={formik.values.currency.includes("USD")}
            onChange={(e) => {
              const updatedCurrency = [...formik.values.currency];
              if (e.target.checked) {
                updatedCurrency.push("USD");
              } else {
                updatedCurrency.splice(updatedCurrency.indexOf("USD"), 1);
              }
              formik.setFieldValue("currency", updatedCurrency);
            }}
          />
          <label htmlFor="USD">USD</label>

          <input
            type="checkbox"
            id="GBP"
            name="currency"
            value="GBP"
            checked={formik.values.currency.includes("GBP")}
            onChange={(e) => {
              const updatedCurrency = [...formik.values.currency];
              if (e.target.checked) {
                updatedCurrency.push("GBP");
              } else {
                updatedCurrency.splice(updatedCurrency.indexOf("GBP"), 1);
              }
              formik.setFieldValue("currency", updatedCurrency);
            }}
          />
          <label htmlFor="GBP">GBP</label>

          <input
            type="checkbox"
            id="YEN"
            name="currency"
            value="YEN"
            checked={formik.values.currency.includes("YEN")}
            onChange={(e) => {
              const updatedCurrency = [...formik.values.currency];
              if (e.target.checked) {
                updatedCurrency.push("YEN");
              } else {
                updatedCurrency.splice(updatedCurrency.indexOf("YEN"), 1);
              }
              formik.setFieldValue("currency", updatedCurrency);
            }}
          />
          <label htmlFor="YEN">YEN</label>

          <input
            type="checkbox"
            id="KYAT"
            name="currency"
            value="KYAT"
            checked={formik.values.currency.includes("KYAT")}
            onChange={(e) => {
              const updatedCurrency = [...formik.values.currency];
              if (e.target.checked) {
                updatedCurrency.push("KYAT");
              } else {
                updatedCurrency.splice(updatedCurrency.indexOf("KYAT"), 1);
              }
              formik.setFieldValue("currency", updatedCurrency);
            }}
          />
          <label htmlFor="KYAT">KYAT</label>

          <input
            type="checkbox"
            id="SINGDOLLAR"
            name="currency"
            value="SINGDOLLAR"
            checked={formik.values.currency.includes("SINGDOLLAR")}
            onChange={(e) => {
              const updatedCurrency = [...formik.values.currency];
              if (e.target.checked) {
                updatedCurrency.push("SINGDOLLAR");
              } else {
                updatedCurrency.splice(
                  updatedCurrency.indexOf("SINGDOLLAR"),
                  1
                );
              }
              formik.setFieldValue("currency", updatedCurrency);
            }}
          />
          <label htmlFor="SINGDOLLAR">SINGDOLLAR</label>
        </fieldset>
        {formik.touched.currency && formik.errors.currency && (
          <div className="errors">{formik.errors.currency}</div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OpenNewBranchSuper;