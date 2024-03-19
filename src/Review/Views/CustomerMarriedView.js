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
     
      </div>
    </div>
  );
}

export default CustomerMarriedView;
