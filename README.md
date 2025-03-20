# Frontend Challenge: Cat Picture App

To run the website, make sure to have Docker installed:

- https://docs.docker.com/get-docker/

To clone the repository, you can use these following commands:

```bash
https://github.com/leonhonge/cat-app.git
cd cat-app
```

To run the Docker image, run the following commands:

```bash
docker build -t cat-app .
docker run -p 8080:8080 cat-app
```

The -t in the build command tags the image with the name "cat-app". 

The -p 8080:8080 flag maps the port 8080 from your local machine to port 8080 in the Docker container

You can access the local webpage using either:

- http://127.0.0.1:8080

OR

- http://172.17.0.2:8080


To stop the container, press Ctrl+C. 

