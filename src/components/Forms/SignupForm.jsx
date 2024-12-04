import "./GeneralFormStyles.css"

function SignupForm(){
    return(
        <section className="sign-up-section">
            <form>
                <label htmlFor="fullName"></label>
                <input type="text" name="fullName" id="fullName" />
                <label htmlFor="course"></label>
                <input type="text" name="course" id="course" />
                <label htmlFor="linkedin"></label>
                <input type="text" name="linkedin" id="linkedin" />
                <label htmlFor="schedule"></label>
                <input type="text" name="schedule" id="schedule" />
                <label htmlFor="languages"></label>
                <input type="text" name="languages" id="languages" />
                <label htmlFor="email"></label>
                <input type="text" name="email" id="email" />
            </form>
        </section>
    )
}

export default SignupForm