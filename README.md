Here’s an improved version of your README file with proper formatting, clarity, and structure:

---

# **Employer Stats API**

An API built for the Oxeir Technologies assignment, designed to deliver core employer dashboard statistics like jobs posted, applicants, hires, and average skill score per job.

---

### 🌐 **Deployment**

* **Live API**: [https://oxeir-ai-resume-builder-manas-kulkarni-1.onrender.com](https://oxeir-ai-resume-builder-manas-kulkarni-1.onrender.com)

---

### ⚙️ **Setup Instructions**

1. **Clone the repository**

   ```bash
   git clone https://github.com/kulkarnimanas732/-oxeir-ai-resume-builder-Manas-Kulkarni.git
   cd oxeir-ai-resume-builder-Manas-Kulkarni
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add the following environment variables:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Run the development server**

   ```bash
   npm start
   ```

---

### 🧠 **AI Logic (Brief)**

While the system currently accepts manually entered `skillScore` values from users, the backend is designed to support future integration with AI/ML systems, such as:

* **Resume parsing** and **ranking models**
* **NLP-based job-applicant matching**
* **Auto SkillScore assignment** using AI based on resumes or candidate answers

The API already supports skill-based aggregation, allowing for smart analytics dashboards and future enhancement with AI.

---

### 🚀 **Key Features**

* **Employer registration** and **login** (with JWT authentication)
* **Job creation** (only accessible by logged-in employers)
* **Applicant submission** with skillScore
* **Mark hires** for each job
* **Stats API** with aggregation for:

  * Total Jobs
  * Total Applicants
  * Total Hires
  * Average SkillScore (bonus feature)

---

### 📈 **API Endpoints**

| Method | Endpoint                 | Description                                                           |
| ------ | ------------------------ | --------------------------------------------------------------------- |
| GET    | `/api/employer/stats`    | Get total jobs, applicants, hires, and avg skillScore (JWT Protected) |
| POST   | `/api/employer/register` | Register a new employer                                               |
| POST   | `/api/employer/login`    | Login and receive JWT token                                           |
| POST   | `/jobs`                  | Create a job (JWT Protected)                                          |
| POST   | `/applicants`            | Submit an applicant for a job                                         |
| POST   | `/hires`                 | Mark an applicant as hired (JWT Protected)                            |

---

### 💡 **Deployment Preference**

* **Deployed on Render**:

  * [Live API URL](https://oxeir-ai-resume-builder-manas-kulkarni-1.onrender.com)

You can use tools like **Postman** or **cURL** to test the protected endpoints. Use the JWT token obtained from the `/api/employer/login` endpoint for authorization.

---

### 📝 **Example cURL Command**

To test a protected endpoint using **cURL**, use the following command after obtaining the JWT token:

```bash
curl -H "Authorization: Bearer <your_jwt_token>" https://oxeir-ai-resume-builder-manas-kulkarni-1.onrender.com/api/employer/stats
```

Replace `<your_jwt_token>` with the actual token from the `/api/employer/login` endpoint.

---

### 🔧 **Future Enhancements**

* Integration with **AI models** for automatic skillScore assignment and resume parsing.
* Enhanced **analytics** for job applicants and hires.

---

