from setuptools import setup
from setuptools import find_packages

setup(
    name='dashboard',
    version='1.0.0',
    author='Kristoffer Snabb',
    url='https://github.com/geonition/dashboard',
    packages=find_packages(),
    include_package_data=True,
    package_data = {
        "auth": [
            "templates/*",
            "static/*",
	    "locale/*"
        ],
    },
    zip_safe=False,
    install_requires=['django']
)
