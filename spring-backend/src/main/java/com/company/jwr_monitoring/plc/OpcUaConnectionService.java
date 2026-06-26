package com.company.jwr_monitoring.plc;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.eclipse.milo.opcua.sdk.client.OpcUaClient;
import org.springframework.stereotype.Service;

import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OpcUaConnectionService {

    private final Map<String, OpcUaClient> clientPool = new ConcurrentHashMap<>();

    /**
     * Get OPC UA client from pool or create new connection.
     */
    public OpcUaClient getClient(String endpointUrl) throws Exception {

        try {

            return clientPool.computeIfAbsent(endpointUrl, key -> {

                try {

                    log.info("Connecting OPC UA Server [{}]", key);

                    OpcUaClient client = OpcUaClient.create(key);

                    client.connect();

                    log.info("OPC UA Connected [{}]", key);

                    return client;

                } catch (Exception ex) {

                    log.error("Failed to connect OPC UA Server [{}]", key, ex);

                    throw new RuntimeException(ex);
                }
            });

        } catch (RuntimeException ex) {

            if (ex.getCause() instanceof Exception exception) {
                throw exception;
            }

            throw ex;
        }
    }

    /**
     * Force remove a broken connection.
     */
    public void invalidateClient(String endpointUrl) {

        OpcUaClient client = clientPool.remove(endpointUrl);

        if (client == null) {
            return;
        }

        try {

            client.disconnect();

            log.warn("OPC UA Client Removed [{}]", endpointUrl);

        } catch (Exception ex) {

            log.error("Error disconnecting OPC UA Client [{}]", endpointUrl, ex);
        }
    }

    /**
     * Shutdown hook.
     */
    @PreDestroy
    public void closeAllClients() {

        log.info("Closing OPC UA Clients...");

        clientPool.forEach((endpointUrl, client) -> {

            try {

                client.disconnect();

                log.info("OPC UA Client Closed [{}]", endpointUrl);

            } catch (Exception ex) {

                log.error("Error closing OPC UA Client [{}]", endpointUrl, ex);
            }
        });

        clientPool.clear();

        log.info("All OPC UA Clients Closed");
    }
}