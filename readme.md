
## API Endpoints


## User Module
#### **Register User**

```http
  POST users/register
```

 **Request Body Parameters**

| Parameter      | Type     | Required | Description                                  |
|-------------- |---------|----------|----------------------------------------------|
| `name`        | `string` | ✅       | Full name of the user                       |
| `email`       | `string` | ✅       | User's email address (must be unique)       |
| `password`    | `string` | ✅       | User's password (hashed before saving)      |
| `phone_no`    | `string` | ✅       | User's phone number                         |
| `event_names` | `array`  | ❌       | List of event names the user is registering for |


#### **User Login**
```http
POST /users/login
```
**Request Body Parameters**

| Parameter   | Type     | Required | Description                      |
|------------|---------|----------|----------------------------------|
| `email`    | `string` | ✅       | User's registered email address |
| `password` | `string` | ✅       | User's password                 |

## Admin Module (organizer)
### Authentication  
- Requires authentication.  
- Only users with the **"organizer"** role are authorized.
#### **Create Event**
```http
POST /admin/create
```
**Request Body Parameters**

| Parameter      | Type     | Required | Description                                  |
|-------------- |---------|----------|----------------------------------------------|
| `date`        | `string` | ✅       | Date of the event                           |
| `time`        | `string` | ✅       | Time of the event                           |
| `description` | `string` | ✅       | Description of the event                    |
| `participants`| `array`  | ❌       | List of participants for the event (default: `[]`) |

#### **List of all Events**
```http
GET /users/
```
**Request Body Parameters**

| Parameter    | Type   | Description                          |
|-------------|--------|--------------------------------------|
| description | string | Description of the event           |
| participants | array  | List of participants for the event |

#### **List of an idv.Event**
```http
GET /users/:id
```

**Request Body Parameters**

| Parameter | Type   | Description                         |
|-----------|--------|-------------------------------------|
| `id`      | string | The unique ID of the event.        |

#### ** Update an idv.Event**
```http
POST  /update/:id
```

**Request Body Parameters**
| Parameter      | Type     | Required | Description                                  |
|-------------- |---------|----------|----------------------------------------------|
| `id`          | `string` | ✅       | The unique ID of the event.                 |
| `date`        | `string` | ✅       | The updated date of the event.              |
| `time`        | `string` | ✅       | The updated time of the event.              |
| `description` | `string` | ✅       | The updated description of the event.       |
| `participants`| `array`  | ❌       | The updated list of participants (default: `[]`). |

#### ** Delete an idv.Event**
```http
DELETE  /delete/:id
```

**Request Body Parameters**
| Parameter | Type     | Required | Description                  |
|-----------|---------|----------|------------------------------|
| `id`      | `string` | ✅       | The unique ID of the event.  |



## Event Module  

### **Register a User for an Event**  

```http
POST /events/register/:id
```
### Request Body Parameters  

| Parameter | Type     | Required | Description                              |
|-----------|---------|----------|------------------------------------------|
| `id`      | `string` | ✅       | The unique ID of the event.             |
| `email`   | `string` | ✅       | Email of the user registering for the event. |

### **Withdrawl of an User form an  Event**  

```http
POST /events/withdrawl/:id
```
### Request Body Parameters  
### Request Body Parameters  

| Parameter | Type     | Required | Description                              |
|-----------|---------|----------|------------------------------------------|
| `id`      | `string` | ✅       | The unique ID of the event.             |
| `email`   | `string` | ✅       | Email of the user withdrawing from the event. |




