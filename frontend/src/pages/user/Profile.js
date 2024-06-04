import React, {useState, useEffect} from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {

    const [name, setName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const {name, emailId, phoneNumber, address} = auth?.user;
        setName(name);
        setEmailId(emailId);
        setPhoneNumber(phoneNumber);
        setAddress(address);
    }, [auth?.user])

    // Process Submitted Registration Details
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            let answer = window.prompt("Are You Sure Want To Update Profile? (yes/no)");
            if(answer !== "yes") return;

            if(newPassword === confirmNewPassword){

                const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile`, {name, oldPassword, newPassword, phoneNumber, address});

                if(res.data.success){
                    setAuth({...auth, user: res.data.user});
                    let ls = localStorage.getItem("auth");
                    ls = JSON.parse(ls);
                    ls.user = res.data.user;
                    localStorage.setItem("auth", JSON.stringify(ls));
                    toast.success(res.data.message);
                }
                else{
                    toast.error(res.data.message);
                }

            }
            else{
                toast.error("New Password not matched with Confirm Password");
            }
        }
        catch(error) {
            console.log(error);
            toast.error("Something Went Wrong.");
        }
    };

    return (
        <Layout title={'EcomSite - Profile'}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card m-3 p-3">
                            <form onSubmit={handleSubmit}>
                            <h4>Profile</h4>
                            <div className="form-group my-2">
                                <input type="text" className="form-control" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                            </div>
                            <div className="form-group my-2">
                                <input type="email" className="form-control" placeholder="Enter Your Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} required disabled/>
                            </div>
                            <div className="form-group my-2">
                                <input type="password" className="form-control" placeholder="Enter Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required/>
                            </div>
                            <div className="form-group my-2">
                                <input type="password" className="form-control" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                            </div>
                            <div className="form-group my-2">
                                <input type="password" className="form-control" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                            </div>
                            <div className="form-group my-2">
                                <input type="text" className="form-control" placeholder="Enter Your PhoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                            </div>
                            <div className="form-group my-2">
                                <input type="text" className="form-control" placeholder="Enter Your Address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">Update Profile</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile; 