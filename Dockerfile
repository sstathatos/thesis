FROM alpine:edge

EXPOSE	3000

RUN	echo '@testing http://nl.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories
RUN	apk upgrade --update-cache --available
RUN 	apk add --update --no-cache bash git nodejs nodejs-npm gcc musl-dev #hdf5-dev@testing hdf5@testing python3  python3-dev 

#RUN 	pip3 install --upgrade pip
#RUN     pip3 install setuptools
#RUN	pip3 install numpy
#RUN	pip3 install h5py

RUN	git clone --depth 1 https://github.com/sstathatos/thesis.git
RUN	cd thesis && npm i --production

RUN	cd thesis/client && npm i --production

WORKDIR	./thesis
CMD	["npm","start"]


