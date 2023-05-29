/**
 * @jest-environment jsdom
 */
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { ROUTES, ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store";
import router from "../app/Router.js";

describe("Given I am connected as an employee", () => {
    describe("When I am on NewBill Page", () => {
        test("Then mail icon in vertical layout should be highlighted", async() => {
        const html = NewBillUI()
        document.body.innerHTML = html
        Object.defineProperty(window, 'localStorage', { value: localStorageMock })
        window.localStorage.setItem('user', JSON.stringify({
            type: 'Employee'
        }))
        const root = document.createElement("div")
        root.setAttribute("id", "root")
        document.body.append(root)
        router()
        window.onNavigate(ROUTES_PATH.NewBill)
        await waitFor(() => screen.getByTestId('icon-mail'))
        const mailIcon = screen.getByTestId('icon-mail')

        //to-do write expect expression
        expect(mailIcon.classList.contains("active-icon")).toBeTruthy();
        })
        test("Then mail icon in vertical layout should be highlighted", ()=>{
      
        })
        test("Then mail icon in vertical layout should be highlighted", ()=>{
      
        })
        test("Then mail icon in vertical layout should be highlighted", ()=>{
      
        })
    })
    describe("When I am on NewBill Page and i fill the form and submit", () => {
        test("Then bill is added", async () => {
            const html = NewBillUI()
            document.body.innerHTML = html



            fireEvent.change(screen.getByTestId("expense-type"), {target:{value:"Transports"}});
            fireEvent.change(screen.getByTestId("expense-name"), {target:{value:"sncf"}});
            fireEvent.change(screen.getByTestId("datepicker"), {target:{value:"2077-12-12"}});
            fireEvent.change(screen.getByTestId("amount"), {target:{value:"20"}});
            fireEvent.change(screen.getByTestId("vat"), {target:{value:"2"}});
            fireEvent.change(screen.getByTestId("pct"), {target:{value:"25"}});
            fireEvent.change(screen.getByTestId("commentary"), {target:{value:"commentaire"}});
            fireEvent.change(screen.getByTestId("file"), {target:{value:""}});


            const newBillForm = screen.getByTestId("form-new-bill");
            const onNavigate = pathname => { document.body.innerHTML = ROUTES({ pathname }); };

            Object.defineProperty(window, 'localStorage', { value: localStorageMock })
            window.localStorage.setItem('user', JSON.stringify({
                type: 'Employee'
            }))
            
            const newBill = new NewBill({ document, onNavigate, store: mockStore, localStorage: window.localStorage });

            const handleChangeFile = jest.fn(newBill.handleChangeFile);
            newBillForm.addEventListener("change", handleChangeFile);
            const fileField = screen.getByTestId("file");
            fireEvent.change(fileField, { target: { files: [ new File(["facture"], "facture.png", { type: "image/png" }) ] } });

            expect(fileField.files[0].name).toBe("facture.png");
            expect(fileField.files[0].type).toBe("image/png");
            
            expect(handleChangeFile).toHaveBeenCalled();

            const handleSubmit = jest.fn(newBill.handleSubmit);
            newBillForm.addEventListener("submit", handleSubmit);
            fireEvent.submit(newBillForm);
            expect(handleSubmit).toHaveBeenCalled();
        })
    })
})
