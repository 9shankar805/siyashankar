# 🚀 Deploy Commands for PowerShell (Windows)

## ⚠️ PowerShell doesn't support `&&`
Use `;` (semicolon) or separate commands instead

---

## 📦 Install Functions Dependencies

### Option 1: Separate Commands (Recommended)
```powershell
cd functions
npm install
```

### Option 2: Single Line with Semicolon
```powershell
cd functions; npm install
```

---

## 🔥 Deploy to Firebase

### Step 1: Login to Firebase
```powershell
firebase login
```

### Step 2: Initialize (First Time Only)
```powershell
firebase init
```
Select:
- ✅ Functions
- ✅ Hosting (optional)

### Step 3: Deploy Functions
```powershell
firebase deploy --only functions
```

---

## 🎯 Complete Deployment (All Steps)

### Method 1: Run Each Command Separately
```powershell
cd functions
npm install
cd ..
firebase deploy --only functions
```

### Method 2: PowerShell Script
Create a file `deploy.ps1`:
```powershell
Set-Location functions
npm install
Set-Location ..
firebase deploy --only functions
```

Run it:
```powershell
.\deploy.ps1
```

---

## 🔧 Alternative: Use CMD Instead

Open **Command Prompt (CMD)** and use `&&`:
```cmd
cd functions && npm install && firebase deploy --only functions
```

---

## 📝 Quick Reference

| Task | PowerShell Command |
|------|-------------------|
| Install deps | `cd functions; npm install` |
| Deploy functions | `firebase deploy --only functions` |
| Deploy hosting | `firebase deploy --only hosting` |
| Deploy all | `firebase deploy` |
| Check status | `firebase projects:list` |

---

## ✅ Correct Sequence for Your Project

```powershell
# 1. Navigate to functions folder
cd functions

# 2. Install dependencies
npm install

# 3. Go back to root
cd ..

# 4. Deploy to Firebase
firebase deploy --only functions
```

---

## 🐛 Common Errors

### "firebase: command not found"
Install Firebase CLI:
```powershell
npm install -g firebase-tools
```

### "Permission denied"
Run PowerShell as Administrator

### "Not logged in"
```powershell
firebase login
```

---

**Use the commands above for Windows PowerShell!** 💻
