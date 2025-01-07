# Electrical Parts
Et fullstack projekt der kan håndtere hvilke elektriske komponenter der har korrekt anvendelse på en specifik hovedmotor

## Webapplikationen
Her kan udføres alle CRUD operationer, dens primære formål er at administrere databasen.
Samtidig er det muligt at se dokumentation tilføjet fra brugerne af mobil applikationen.

## Mobil applikationen
Dens primære formål at vise den origanle dokumentation efter  hvilken hovedmoter der arbejdes på.
Samtidig er det muligt at: 
  - Efterspørge nye komponenter via en autogeneret Email
  - Dokumentere eget arbejde.
  - Lave en Q/A-attest



QR-KODE skal anvendes til at scanne i mobilapplikationen:

![image](https://github.com/user-attachments/assets/fc3b4b7f-48ac-41e7-ac88-fb02ae3c8832)

## Links til deployede versioner
- **Webapplikation**: https://ambitious-island-0fc3ebe03.4.azurestaticapps.net  
- **Mobilapplikation (kun Android)**: https://play.google.com/apps/internaltest/4701738040560284851  


## GitHub Links til lokal kørsel af projektet
*(Tilføj links til de relevante GitHub-repositories her)*

## BACKEND
Naviger til backend-mappen og installer afhængigheder:  
cd backend  # Erstat med det faktiske mappenavn  
npm install

Opret en .env fil i roden af projektet
### .env-filens indhold:
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=<Password>  
DB_NAME=electrical_parts  
PORT=5000  
JWT_SECRET=Love3006_ForGood3103_AllwaysRemember  
EMAIL_USER=worker24121990@gmail.com  
EMAIL_PASS=giqprxavhbpfqgpp  

Start backend:  
node server.js  

## Webapplikation
Naviger til webapplikation-mappen og installer afhængigheder:  
cd webapplikation  # Erstat med det faktiske mappenavn  
npm install

### Start webapplikationen:  
npm run dev  

### Login-oplysninger
**Webapplikation**:  
User: alice@example.com  
Password: password123  


## Mobilapplikation
Naviger til mobilapplikation-mappen og installer afhængigheder:  
cd mobilapplikation  # Erstat med det faktiske mappenavn  
npm install  

Start mobilapplikationen:  
npx expo  

**Mobilapplikation**:  
User: alice@example.com  
Password: password123  
Engine no: KAA008026 


 
