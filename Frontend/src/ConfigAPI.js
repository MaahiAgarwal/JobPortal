import axios from "axios";

const API_BASE_URL =  process.env.REACT_APP_API_BASE_URL;

const signup = async (formData, userType) => {
    try {
        let form = new FormData();  
        let endpoint = "";

        if (userType === "employer") {
            endpoint = `${API_BASE_URL}/employers/register`;

            form.append("name", formData.fullName);
            form.append("email", formData.email);
            form.append("password", formData.password);
            form.append("company", formData.company);

            console.log("Employer FormData", form);            
        } else if (userType === "jobseeker") {
            endpoint = `${API_BASE_URL}/users/register`;

            form.append("name", formData.fullName);
            form.append("email", formData.email);
            form.append("password", formData.password);

            if (formData.profilePic) {
                form.append("profileImage", formData.profilePic);
            }

            if (formData.resume) {
                form.append("resume", formData.resume);  
            }

            console.log("Resume", formData.resume);            
            console.log("User FormData", form);

            //return response;
        }
        
        const response = await axios.post(endpoint, form, {
            headers: {
                'Content-Type': 'multipart/form-data', // Need to specify this when sending FormData
            },
        });
        console.log("Response", response);
        
    } catch (error) {
        console.error("Error in signup", error);
    }
};

const login = async (formData, userType) =>{
    try {
        let endpoint = "";
        let form = new FormData();

        console.log("FormData", formData);        

        if(userType === "employer"){
            endpoint = `${API_BASE_URL}/employers/login`
            
            form.append("email", formData.email);
            form.append("password", formData.password);

            console.log("Employer FormData", form);

        }else if(userType === "user"){
            endpoint = `${API_BASE_URL}/users/login`

            form.append("email", formData.email);
            form.append("password", formData.password);
        }

        const response = await axios.post(endpoint, form,{
            withCredentials: true,
        })
        console.log("Response", response);
        response.data.userType = userType;
        return response;
    } catch (error) {
        console.log("Error in login", error);        
    }
}

const logout = async (userType) => {
    try {
        if (!userType || (userType !== "employer" && userType !== "user")) {
            throw new Error("Invalid userType provided");
        }

        let endpoint = "";
        if(userType === "employer"){
            endpoint = `${API_BASE_URL}/employers/logout`
        }else if(userType === "user"){
            endpoint = `${API_BASE_URL}/users/logout`
        }

        const response = await axios.post(endpoint, {}, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            console.log("Logged out successfully:", response.data);
            return response;
        } else {
            console.warn("Unexpected response status:", response.status);
            throw new Error("Logout failed");
        }
    } catch (error) {
        console.error("Error in logout:", error.response?.data || error.message);
        // Even if the server request fails, we should still clear the local state
        return { status: 200, data: { message: "Logged out locally" } };
    }
};

const getJobs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/jobs/`);
        console.log("Response", response);
        return response.data.data;
    } catch (error) {
        console.log("Error in getJobs", error);        
    }
}

const postJob = async (formData) => {
    try {
        let form = new FormData();  

        form.append("title", formData.title);
        form.append("description", formData.description);
        form.append("location", formData.location);
        form.append("company", formData.company);
        form.append("salary", formData.salary);

        const response = await axios.post(`${API_BASE_URL}/jobs/postJobs`, form, {
            headers: {
                'Content-Type': 'multipart/form-data', // Need to specify this when sending FormData
            },
            withCredentials: true,
        });
        console.log("Response", response);
        
    } catch (error) {
        console.error("Error in postJob", error);
    }
}

const searchJob = async(queryData) => {
    try {
        const endpoint = `${API_BASE_URL}/jobs/search`;

        const response = await axios.post(endpoint, queryData)
        console.log("Response", response);
        return response.data.data;
    } catch (error) {
        console.log("Error in searchJob", error);        
    }
}

const saveJobToUser = async(jobId) => {
    try {
        let endpoint = `${API_BASE_URL}/users/apply`;

        console.log("Job ID: ", jobId);
        const response = await axios.post(endpoint,{jobId},{
            withCredentials: true,
        });
        console.log("Response", response);
        return response;
    } catch (error) {
        console.log("Error in applyJob", error);        
    }
}

const getUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/getUser`,
            { withCredentials: true } // Ensure cookies are sent with the request
        )
        console.log("Response", response);
        return response.data.data; // Return the user data
    } catch (error) {
        console.log("Error in getUser", error);
        return null; // Return null if there's an error
    }
}

const getEmployer = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/employers/getEmployer`, {
            withCredentials: true
        })

        if(!response || !response.data || !response.data.data) {
            console.error("Invalid response structure:", response);
            return null; // Return null if the response structure is unexpected
        }
        return response.data.data; // Return the employer data
    } catch (error) {
        console.log("Error in getEmployer", error);
        return null; // Return null if there's an error
    }
}

const getPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/community-posts/`)
        console.log("Response", response);
        return response.data.data; // Return the posts data
    } catch (error) {
        console.log("Error in getPosts", error);
        
    }
}

const savePost = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/community-posts/`,
            formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure the correct content type for FormData
                },
                withCredentials: true, 
            }// Ensure cookies are sent with the request}
        )
        console.log("Response", response);
        return response.data; // Return the saved post data

    } catch (error) {
        console.log("Error in savePost", error);  
        return null; // Return null if there's an error     
    }
}

const incrementLikes = async (postId, userId, userType) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/community-posts/${postId}/likes`, {
            userId: userId,
            userType: userType === "user" ? "JobSeeker" : "Employer"
        }, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        console.log("Response", response);
        return response.data; // Return the updated post data
    } catch (error) {
        console.log("Error in incrementLikes", error);
        return null; // Return null if there's an error
    }
}

export {signup, login, logout, getJobs, postJob, searchJob, saveJobToUser, getUser, getEmployer, getPosts, savePost, incrementLikes};
