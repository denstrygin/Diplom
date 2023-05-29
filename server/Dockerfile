FROM python:3.9-slim-buster
WORKDIR /app/server
COPY . ./
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "server.py"]