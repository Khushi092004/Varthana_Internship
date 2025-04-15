module.exports = {
    CREATE_FRIEND_REQUEST: `
      INSERT INTO friendships (requester_id, receiver_id, status) 
      VALUES ($1, $2, 'pending') 
      RETURNING *;
    `,
  
    ACCEPT_FRIEND_REQUEST: `
      UPDATE friendships 
      SET status = 'accepted', updated_at = CURRENT_TIMESTAMP 
      WHERE requester_id = $1 AND receiver_id = $2 
      RETURNING *;
    `,
  
    REJECT_FRIEND_REQUEST: `
      UPDATE friendships 
      SET status = 'rejected', updated_at = CURRENT_TIMESTAMP 
      WHERE requester_id = $1 AND receiver_id = $2 
      RETURNING *;
    `,
  
    GET_USER_FRIENDS: `
      SELECT u.id, u.username, u.email 
      FROM users u
      INNER JOIN friendships f 
        ON (f.requester_id = u.id OR f.receiver_id = u.id)
      WHERE 
        (f.requester_id = $1 OR f.receiver_id = $1)
        AND f.status = 'accepted'
        AND u.id != $1;
    `,
  
    GET_PENDING_REQUESTS: `
      SELECT 
        f.id, 
        f.requester_id, 
        u.username AS requester_username, 
        u.email AS requester_email
      FROM friendships f
      JOIN users u ON f.requester_id = u.id
      WHERE f.receiver_id = $1 AND f.status = 'pending';
    `,

  
    CHECK_EXISTING_REQUEST: `
      SELECT * FROM friendships 
      WHERE (requester_id = $1 AND receiver_id = $2) 
         OR (requester_id = $2 AND receiver_id = $1);
    `
  };
  