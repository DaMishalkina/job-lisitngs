export  const getJobs = async() => {
    try {
        const response = await fetch(process.env.NODE_ENV === "production"
            ? "https://raw.githubusercontent.com/DaMishalkina/job-lisitngs/main/src/assets/data/jobs.json"
            : "src/assets/data/jobs.json"
        );
        return await response.json();

    }
    catch (error){
        console.error(error);
    }
}