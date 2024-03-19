import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function CustomerSingleView(props) {
  const { data } = useSelector((store) => store.customer);

  return (
    <div>
      {/* {JSON.stringify(props.singlegeneralfiles)} */}
      <div>
        {props.singlegeneralfiles?.length > 0 && (
          <ListGroup>
            {props.singlegeneralfiles.map((single) => {
              return <ListGroup.Item> {single.checkListId?.enName} </ListGroup.Item>;
            })}
          </ListGroup>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/* props.loan?.auditorApproved === false &&   */}
        {(data.groups[0] === 'ROLE_OFFICER' || data.groups[0] === 'ROLE_APPLICANT') && <a href={`/singlecustomeredit/${props.customer?.id}`}>Edit</a>}
      </div>
    </div>
  );
}

export default CustomerSingleView;
