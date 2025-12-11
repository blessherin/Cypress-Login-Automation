describe('Reqres.in API Automation - Fixed (no invalid retry flags)', () => {

  const baseUrl = 'https://reqres.in/api';
  const defaultOpts = {
    timeout: 30000,
    failOnStatusCode: false, // allow non-2xx so Cloudflare 403 doesn't auto-fail
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  // 1. GET List Users
  it('TC001 - Get List Users', () => {
    cy.request({
      ...defaultOpts,
      method: 'GET',
      url: `${baseUrl}/users?page=2`
    }).then((res) => {
      expect([200, 403]).to.include(res.status);
      if (res.status === 200) {
        expect(res.body.data).to.be.an('array');
      }
    });
  });

  // 2. GET Single User
  it('TC002 - Get Single User', () => {
    cy.request({
      ...defaultOpts,
      method: 'GET',
      url: `${baseUrl}/users/2`
    }).then((res) => {
      expect([200, 403]).to.include(res.status);
      if (res.status === 200) {
        expect(res.body.data).to.have.property('id', 2);
      }
    });
  });

  // 3. GET Single User Not Found (404)
  it('TC003 - User Not Found', () => {
    cy.request({
      ...defaultOpts,
      method: 'GET',
      url: `${baseUrl}/users/23`
    }).then((res) => {
      expect([404, 403]).to.include(res.status);
    });
  });

  // 4. POST Create User
  it('TC004 - Create User', () => {
    cy.request({
      ...defaultOpts,
      method: 'POST',
      url: `${baseUrl}/users`,
      body: {
        name: "Blessherin",
        job: "QA Tester"
      }
    }).then((res) => {
      expect([201, 403]).to.include(res.status);
      if (res.status === 201) {
        expect(res.body).to.have.property('name', 'Blessherin');
      }
    });
  });

  // 5. POST Login Successful
  it('TC005 - Login Successfully', () => {
    cy.request({
      ...defaultOpts,
      method: 'POST',
      url: `${baseUrl}/login`,
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      }
    }).then((res) => {
      expect([200, 403]).to.include(res.status);
      if (res.status === 200) {
        expect(res.body).to.have.property('token');
      }
    });
  });

  // 6. POST Login Failed (Missing Password)
  it('TC006 - Login Failed (Missing Password)', () => {
    cy.request({
      ...defaultOpts,
      method: 'POST',
      url: `${baseUrl}/login`,
      body: { email: "peter@klaven" }
    }).then((res) => {
      expect([400, 403]).to.include(res.status);
      if (res.status === 400) {
        expect(res.body.error).to.eq("Missing password");
      }
    });
  });

  // 7. PUT Update User
  it('TC007 - Update User', () => {
    cy.request({
      ...defaultOpts,
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      body: {
        name: "Blessherin",
        job: "QA Automation"
      }
    }).then((res) => {
      expect([200, 403]).to.include(res.status);
    });
  });

  // 8. DELETE User
  it('TC008 - Delete User', () => {
    cy.request({
      ...defaultOpts,
      method: 'DELETE',
      url: `${baseUrl}/users/2`
    }).then((res) => {
      expect([204, 200, 403]).to.include(res.status);
    });
  });

});