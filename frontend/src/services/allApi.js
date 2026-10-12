import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

// register
export const registerApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody)
}
// loginn

export const loginApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody)
}
// googlelogin

export const googleLoginApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/google-login`,reqBody)
}

export const updateUserProfileApi = async (reqBody, reqHeader) => {
    return await commonApi("PUT",`${serverUrl}/update-profile`,reqBody, reqHeader)
};


// packages
export const allPackageApi=async(reqBody)=>{
    return await commonApi('GET',`${serverUrl}/package`,reqBody)
}
export const addPackageApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/add-package`,reqBody)
}
export const updatePackageApi=async(id,reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/update-package/${id}`,reqBody)
}
export const deletePackageApi=async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-package/${id}`)
}

// payment
export const makePaymentApi=async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/make-payment`,reqBody,reqHeader)
}




//destination 
export const getDestinationApi=async(searchKey,reqBody)=>{
    return await commonApi('GET',`${serverUrl}/get-destination?search=${searchKey}`,reqBody)
}
export const addDestinationApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/add-destination`,reqBody)
}
export const updateDestinationApi=async(id,reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/update-destination/${id}`,reqBody)
}
export const deleteDestinationApi=async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-destination/${id}`)
}



// booking

export const addBookingApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/add-booking`,reqBody)
}
export const getAllBookingApi=async()=>{
    return await commonApi('GET',`${serverUrl}/get-booking`)
}
export const getUserBookingApi=async(email)=>{
    return await commonApi('GET',`${serverUrl}/user-booking/${email}`)
}
export const updateBookingApi=async(id,reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/update-booking/${id}`,reqBody)
}
export const UpdateBookingStatusApi=async(id,reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/update-booking-status/${id}`,reqBody)
}
export const deleteBookingApi=async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-booking/${id}`)
}


