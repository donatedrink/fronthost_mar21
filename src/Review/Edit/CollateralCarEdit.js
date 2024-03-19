import React from 'react';
import { useParams } from 'react-router-dom';

function CollateralCarEdit() {
  const { loanId } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">CollateralCarEdit {loanId}</div>
      </div>
    </div>
  );
}

export default CollateralCarEdit;
