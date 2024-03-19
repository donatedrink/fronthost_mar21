import React from "react";

function LoanStatus(props) {
  return (
    <div>
      {props.loan.auditorApproved ? (
        <>
          <a href={`/reports/${props.loan?.customer?.id}/${props.loan?.id}`}>
            Docs
          </a>
          &nbsp; &nbsp;
          <a href={`/review/${props.loan?.customer?.id}/${props.loan?.id}`}>
            Review
          </a>
        </>
      ) : props.loan.toauditor ? (
        <>Auditor</>
      ) : props.loan.to_o ? (
        <>OFF</>
      ) : (
        <>APP</>
      )}
    </div>
  );
}

export default LoanStatus;
