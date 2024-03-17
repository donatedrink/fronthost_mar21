import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function CustomerMarriedView(props) {
  const { data } = useSelector((store) => store.customer);

  return (
    <div>
      <div>
        {props.marriedgeneralfiles?.length > 0 && (
          <ListGroup>
            {props.marriedgeneralfiles.map((married) => {
              return <ListGroup.Item> One </ListGroup.Item>;
            })}
          </ListGroup>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/* props.loan?.decisionmakerApproved === false &&  */}
        {(data.groups[0] === 'ROLE_OFFICER' || data.groups[0] === 'ROLE_APPLICANT') && <a href={`/marriedcustomeredit/${props.customer[0]?.id}`}>Edit</a>}
      </div>
    </div>
  );
}

export default CustomerMarriedView;
