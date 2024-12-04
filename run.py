import os
import subprocess

def run_command(command, cwd=None):
    process = subprocess.Popen(command, cwd=cwd, shell=True)
    return process

if not os.path.exists("back-end-fasta/venv"):
    print("Criando ambiente virtual para o back-end Python...")
    subprocess.run("python -m venv back-end-fasta/venv", shell=True)
else:
    print("Ambiente virtual já existe. Pulando criação.")

if not os.path.exists("back-end-fasta/venv/Lib/site-packages"):
    print("Instalando dependências do Python...")
    subprocess.run("back-end-fasta/venv/Scripts/pip install -r back-end-fasta/requirements.txt", shell=True)
else:
    print("Dependências do Python já instaladas. Pulando instalação.")

if not os.path.exists("back-end/node_modules"):
    print("Instalando dependências do Node.js no back-end...")
    subprocess.run("npm install", cwd="back-end", shell=True)
else:
    print("Dependências do Node.js no back-end já instaladas. Pulando instalação.")

if not os.path.exists("front-end/node_modules"):
    print("Instalando dependências do React...")
    subprocess.run("npm install", cwd="front-end", shell=True)
else:
    print("Dependências do React já instaladas. Pulando instalação.")

print("Iniciando o back-end Python...")
python_executable = os.path.abspath("back-end-fasta/venv/Scripts/python.exe")
app_script = os.path.abspath("back-end-fasta/app.py")
python_process = run_command(f'"{python_executable}" "{app_script}"')

print("Iniciando o back-end Node.js...")
node_process = run_command("npm start", cwd="back-end")

print("Iniciando o front-end React...")
react_process = run_command("npm run dev", cwd="front-end")

python_process.wait()
node_process.wait()
react_process.wait()
