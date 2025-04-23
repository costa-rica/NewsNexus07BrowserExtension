import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/AddArticle.module.css";
import NavigationBar from "./common/NavigationBar";
import { useState } from "react";
import InputDropdownCheckbox from "./common/InputDropdownCheckbox";

export default function AddArticle() {
  const userReducer = useSelector((state) => state.user);
  const [newArticle, setNewArticle] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [stateArray, setStateArray] = useState(userReducer.stateArray);
  const handleAddAndSubmitArticle = async () => {
    const selectedStateObjs = stateArray.filter((st) => st.selected);
    const errors = {
      publicationName: !newArticle.publicationName,
      title: !newArticle.title,
      publishedDate: !newArticle.publishedDate,
      content: !newArticle.content,
    };
    setInputErrors(errors);

    if (
      !newArticle.publicationName ||
      !newArticle.title ||
      !newArticle.publishedDate ||
      !newArticle.content
    ) {
      alert(
        "Please fill in all required fields: publication name, title, published date, content"
      );
      return;
    }

    // Validation first
    if (selectedStateObjs.length === 0) {
      alert("Please select at least one state");
      return;
    }

    // Construct updated article
    const updatedArticle = {
      ...newArticle,
      stateObjArray: selectedStateObjs,
      isApproved: true,
      kmNotes: "added manually",
    };

    setNewArticle(updatedArticle);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/articles/add-article`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userReducer.token}`,
          },
          body: JSON.stringify(updatedArticle),
        }
      );

      console.log(`Response status: ${response.status}`);
      let resJson = null;
      const contentType = response.headers.get("Content-Type");

      if (contentType?.includes("application/json")) {
        resJson = await response.json();
      }

      if (resJson) {
        console.log("Fetched Data:", resJson);
        if (response.status === 400) {
          alert(resJson.message);
          return;
        } else {
          alert("Successfully added article");
          // setArticle({});
          const blankArticle = {
            publicationName: "",
            title: "",
            url: "",
            publishedDate: "",
            content: "",
            stateObjArray: [],
          };

          setNewArticle(blankArticle);
          // Deselect all states
          setStateArray(userReducer.stateArray);
        }
      }
    } catch (error) {
      console.error("Error adding article:", error.message);
    }
    // fetchArticlesSummaryStatistics();
    // fetchArticlesArray();
  };

  return (
    <div className={styles.divMain}>
      <NavigationBar />
      <h2>Add Article</h2>
      <div className={styles.divMainMiddle}>
        <div className={styles.divArticleDetail}>
          <span className={styles.lblArticleDetailMain}>Publication Name:</span>
          <input
            type="text"
            value={newArticle?.publicationName || ""}
            className={`${inputErrors.publicationName ? "inputError" : ""} ${
              styles.inputArticleDetail
            }`}
            onChange={(e) =>
              setNewArticle({
                ...newArticle,
                publicationName: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.divArticleDetail}>
          <span className={styles.lblArticleDetailMain}>Title:</span>
          <input
            type="text"
            value={newArticle?.title || ""}
            className={`${inputErrors.title ? "inputError" : ""} ${
              styles.inputArticleDetail
            }`}
            onChange={(e) =>
              setNewArticle({ ...newArticle, title: e.target.value })
            }
          />
        </div>

        <div className={styles.divArticleDetail}>
          <span className={styles.lblArticleDetailMain}>URL:</span>
          <input
            type="text"
            value={newArticle?.url || ""}
            className={styles.inputArticleDetail}
            onChange={(e) =>
              setNewArticle({ ...newArticle, url: e.target.value })
            }
          />
        </div>
        <div className={styles.divArticleDetail}>
          <span className={styles.lblArticleDetailMain}>Published Date:</span>
          <input
            type="date"
            value={newArticle?.publishedDate || ""}
            className={`${inputErrors.publishedDate ? "inputError" : ""} ${
              styles.inputArticleDetail
            }`}
            onChange={(e) =>
              setNewArticle({ ...newArticle, publishedDate: e.target.value })
            }
          />
        </div>
        <div className={styles.divArticleDetail}>
          <div className="tooltipWrapper">
            <span className={styles.lblArticleDetailMain}>Article State:</span>
            <span className="tooltipText">State(s) article is relevant to</span>
          </div>
          <div className={styles.divManageStates}>
            <InputDropdownCheckbox
              inputObjectArray={stateArray}
              setInputObjectArray={setStateArray}
              displayName="name"
              inputDefaultText="select states ..."
            />
          </div>
        </div>

        <div className={styles.divArticleDetailContent}>
          <span className={styles.lblArticleDetailMain}>Content:</span>

          <textarea
            value={newArticle?.content || ""}
            className={`${inputErrors.content ? "inputError" : ""} ${
              styles.inputArticleDetailContent
            }`}
            onChange={(e) => {
              setNewArticle({
                ...newArticle,
                content: e.target.value,
              });
            }}
          />
        </div>
        <div className={styles.divMainMiddleBottom}>
          {newArticle?.id ? (
            <div className={styles.divMainMiddleBottomButtons}>
              <button
                className={styles.btnClear}
                onClick={() => {
                  setNewArticle({});
                }}
              >
                Clear
              </button>
            </div>
          ) : (
            <button
              className={styles.btnSubmit}
              onClick={() => {
                handleAddAndSubmitArticle();
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
