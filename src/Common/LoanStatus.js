import React from "react";

function LoanStatus(props) {
  return (
    <div>
      {props.loan.auditorApproved ? (
        <a href={`/reports/${props.loan.customer?.id}/${props.loan.id}}`}> Docs </a>
      ) : (
        ""
      )}
    </div>
  );
}

export default LoanStatus;
