import React from "react";
import styles from "./branches.module.css";
import BranchCard from "../../components/BranchCard";
const BranchesPage = () => {
  return (
    <div className={styles.page}>
      <h1>Explore our Branches</h1>
      <div className={styles.branch_container}>
        <BranchCard />
        <BranchCard />
        <BranchCard />
        <BranchCard />
      </div>
    </div>
  );
};
export default BranchesPage;
