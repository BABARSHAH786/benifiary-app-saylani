const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    cnic,
    name,
    phone,
    gender,
    address,
    familyMembers,
    department,
    tokenNumber,
    visitDate: new Date().toISOString().split('T')[0],
    createdBy: userIdFromToken // get from auth context or localStorage
  };

  try {
    const response = await axios.post("http://localhost:5000/api/beneficiary/register", data, {
      headers: {
        Authorization: `Bearer ${token}` // if required
      }
    });

    console.log("Registered Successfully", response.data);
    toast.success("Beneficiary Registered!");
  } catch (err) {
    console.error(err);
    toast.error("Registration Failed");
  }
};
