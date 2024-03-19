import React from "react";

function LoanStatus(props) {
  return (
    <div>
      {props.loan.auditorApproved ? (
        <a href={`/collaterals/${props.loan?.id}`}> Edit Garage Report </a>
      ) : (
        ""
      )}
    </div>
  );
}

export default LoanStatus;
